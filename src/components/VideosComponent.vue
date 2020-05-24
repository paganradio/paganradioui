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
      videos: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
      participants: [],
      socket: {},
    };
  },
  methods: {
    OnLogin: function (socket) {
      this.socket = socket;
    },
    OnJoinClick: function (vidID) {
      this.socket.on("message", (message) => {
        switch (message.event) {
          case "newParticipantArrived":
            this.ReceiveVideo(
              message.userid,
              message.username,
              message.videoID
            );
            break;
          case "existingParticipants":
            this.OnExistingParticipants(message);
            break;
          case "candidate":
            this.AddIceCandidate(message.userid, message.candidate);
            break;
        }
      });

      var message = {
        event: "join",
        videoID: vidID,
      };
      this.SendMessage(message);
    },
    // at this point we've been assigned a userid(socketid)
    OnExistingParticipants: async function (message) {
      var thisvue = this;
      var videoComponent = this.$refs.videos[message.videoID];
      var video = videoComponent.GetVideo();
      video.id = message.userid;
      video.autoplay = true;
      console.log(this.$refs.videos[message.videoID].username);
      console.log(video);

      var user = {
        id: message.userid,
        username: message.userName,
        video: video,
        rtcPeer: null,
        videoID: message.videoID,
      };

      this.participants[message.userid] = user;

      var constraints = videoComponent.constraints;

      var options = {
        localVideo: video,
        mediaConstraints: constraints,
        onicecandidate: OnIceCandidate,
      };
      console.log(options);
      user.rtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(
        options,
        function (err) {
          if (err) {
            return console.error(err);
          }
          this.generateOffer(onOffer);
        }
      );

      message.existingUsers.forEach(function (element) {
        thisvue.ReceiveVideo(element.id, element.name, element.videoID);
      });

      function onOffer(err, offer) {
        var receiveMessage = {
          event: "receiveVideoFrom",
          userid: user.id,
          sdpOffer: offer,
        };
        thisvue.SendMessage(receiveMessage);
      }

      function OnIceCandidate(candidate) {
        var iceCandidateMessage = {
          event: "candidate",
          userid: message.userid,
          candidate: candidate,
        };
        thisvue.SendMessage(iceCandidateMessage);
      }
    },
    ReceiveVideo: function (userid, username, videoID) {
      var thisvue = this;
      console.log(videoID);
      var videoComponent = this.$refs.videos[videoID];
      var video = videoComponent.GetVideo();
      video.autoplay = true;
      video.id = userid;

      var user = {
        id: userid,
        username: username,
        video: video,
        rtcPeer: null,
        videoID: videoID,
      };

      var options = {
        remoteVideo: video,
        onicecandidate: onIceCandidate,
      };

      this.participants[userid] = user;

      user.rtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(
        options,
        function (err) {
          if (err) {
            return console.error(err);
          }
          this.generateOffer(onOffer);
        }
      );

      function onOffer(err, offer) {
        var message = {
          event: "receiveVideoFrom",
          userid: userid,
          sdpOffer: offer,
        };
        thisvue.SendMessage(message);
      }

      function onIceCandidate(candidate) {
        var message = {
          event: "candidate",
          userid: user.id,
          candidate: candidate,
        };
        thisvue.SendMessage(message);
      }
    },
    SendMessage: function (message) {
      console.log("sending " + message.event + " message to server");
      this.socket.emit("message", message);
    },
    AddIceCandidate: function (userid, candidate) {
      this.participants[userid].rtcPeer.addIceCandidate(candidate);
    },
    OnReceiveVideoAnswer: function (senderid, sdpAnswer) {
      this.participants[senderid].rtcPeer.processAnswer(sdpAnswer);
    },
  },
};
</script>

<style scoped>
.VideosComponent {
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
  grid-gap: 3px;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: inherit;
  background: #555;
  z-index: -2;
}
</style>
