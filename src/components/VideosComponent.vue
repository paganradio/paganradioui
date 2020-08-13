<template>
  <div class="VideosComponent">
    <VideoComponent
      v-for="vid in videos"
      :key="'video' + vid.id"
      @join="OnJoinClick(vid.id)"
      ref="videos"
    />
  </div>
</template>

<script>
import kurentoUtils from "kurento-utils";
import VideoComponent from "@/components/VideoComponent";
export default {
  components: {
    VideoComponent,
  },
  data() {
    return {
      videos: [
        { id: 0, streamer: null },
        { id: 1, streamer: null },
        { id: 2, streamer: null },
        { id: 3, streamer: null },
      ],
      receivers: [],
      socket: {},
      iceCandidateQueues: [],
      videoID: -1,
    };
  },
  methods: {
    OnLogin: function (socket) {
      this.socket = socket;
      socket.on("message", (message) => {
        console.log(message);
        switch (message.event) {
          case "StreamerAnswer":
            this.StreamerAnswer(message);
            break;
          case "ReceiverAnswer":
            this.ReceiverAnswer(message);
            break;
          case "ExistingStreamers":
            this.GetStreams(message.streamers);
            break;
          case "NewStreamerConnected":
            this.GetStreams(message.streamers);
            break;
          // response from server, ice candidates for corresponding endpoint
          case "OnStreamerIceCandidate":
            if (this.videoID !== -1)
              this.videos[this.videoID].streamer.webRtcPeer.addIceCandidate(
                message.candidate
              );
            break;
          case "OnReceiverIceCandidate":
            var video = this.videos.find(
              (x) => x.streamer.id == message.streamerid
            );
            video.streamer.webRtcPeer.addIceCandidate(message.candidate);
            break;
          case "StreamerDisconnected":
            this.DisconnectFrom(message.streamerid);
            break;
        }
      });
      this.SendMessage({ event: "ExistingStreamers" });
    },
    DisconnectFrom(streamerid) {
      var video = this.videos.find((x) => x.streamer.id == streamerid);

      var videoComponent = this.$refs.videos[video.id];
      videoComponent.StreamerDisconnected();

      video.streamer = null;
    },
    ReceiverAnswer(message) {
      var video = this.videos.find((x) => x.streamer.id == message.streamerid);
      if (video) {
        video.streamer.webRtcPeer.processAnswer(message.sdpAnswer);
      } else console.log("cant find streamer");
    },
    StreamerAnswer(message) {
      console.log(this.videos[this.videoID].streamer);
      if (this.videoID !== -1)
        this.videos[this.videoID].streamer.webRtcPeer.processAnswer(
          message.answerSdp
        );
    },
    GetStreams(streamers) {
      console.log(streamers);
      // bind streamer to local video id
      streamers.forEach((streamer) => {
        var video = this.videos.find((video) => video.streamer == null);

        video.streamer = {
          username: streamer.username,
          id: streamer.id,
          WebRtcPeer: null,
        };

        this.GetStream(video);
      });
    },
    GetStream(video) {
      var videoComponent = this.$refs.videos[video.id];
      videoComponent.StreamerConnected(video.streamer.username);
      var remoteVideo = videoComponent.GetVideo();
      var thisvue = this;
      var options = {
        remoteVideo: remoteVideo,
        onicecandidate: OnReceiverIceCandidate,
      };

      video.streamer.webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(
        options,
        function (error) {
          if (error) console.log(error);
          this.generateOffer(OnOfferReceiver);
        }
      );
      // create receive only peers here
      function OnOfferReceiver(error, offerSdp) {
        if (error) console.log(error);
        var message = {
          event: "ReceiverOffer",
          streamerid: video.streamer.id,
          sdpOffer: offerSdp,
        };
        thisvue.SendMessage(message);
      }
      function OnReceiverIceCandidate(candidate) {
        console.log(candidate);
        var message = {
          event: "OnReceiverIceCandidate",
          streamerid: video.streamer.id,
          candidate: candidate,
        };
        thisvue.SendMessage(message);
      }
    },
    SendStream(videoID) {
      console.log(videoID);
      var videoComponent = this.$refs.videos[videoID];
      var localVideo = videoComponent.GetVideo();
      var thisvue = this;
      localVideo.autoplay = true;
      var options = {
        localVideo: localVideo,
        onicecandidate: this.OnStreamerIceCandidate,
      };

      var videoData = this.videos.find((video) => video.id === videoID);
      var webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(
        options,
        function (error) {
          if (error) console.log(error);
          this.generateOffer(thisvue.OnOfferStreamer);
        }
      );
      this.videoID = videoID;
      videoData.streamer = {
        username: "me",
        id: this.socket.id,
        webRtcPeer: webRtcPeer,
      };
    },
    OnOfferStreamer(error, offerSdp) {
      if (error) console.log(error);
      var message = {
        event: "StreamerOffer",
        sdpOffer: offerSdp,
      };
      this.SendMessage(message);
    },
    OnStreamerIceCandidate(candidate) {
      console.log(candidate);
      var message = {
        event: "OnStreamerIceCandidate",
        candidate: candidate,
      };
      this.SendMessage(message);
    },
    OnJoinClick: function (videoID) {
      this.SendStream(videoID);
    },
    // at this point we've been assigned a userid(socketid)
    SendMessage: function (message) {
      console.log("sending " + message.event + " message to server");
      this.socket.emit("message", message);
    },
  },
};
</script>

<style scoped>
.VideosComponent {
  margin: 3px;
  padding: 3px;
  height: 90%;
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
  grid-gap: 3px;
  z-index: 0;
}
</style>
