let toggleScreen = async (e) => {
  let screenBtn = e.currentTarget;
  let cameraBtn = document.querySelector("#camera-btn");

  if (!sharingScreen) {
    sharingScreen = true;

    screenBtn.classList.add("active");
    cameraBtn.classList.remove("active");

    cameraBtn.style.display = "none";

    //ask for a screen
    localScreenTracks = await AgoraRTC.createScreenVideoTrack();

    document.querySelector(`#user-container-${uid}`).remove();
    displayFrame.style.display = "block";

    let player = `
      <div class="video__container" id="user-container-${uid}">
          <div class="video-player" id="user-${uid}"></div>
      </div>
    `;

    displayFrame.insertAdjacentHTML("beforeend", player);

    document
      .querySelector(`#user-container-${uid}`)
      .addEventListener("click", expandVideoFrame);

    userIdInDisplayFrame = `user-container-${uid}`;
    localScreenTracks.play(`user-${uid}`);

    //so that the others can see our screen and not camera
    await client.unpublish([localTracks[1]]);
    await client.publish([localScreenTracks]);

    let videoFrames = document.querySelectorAll(".video__container");

    videoFrames.forEach((el) => {
      if (el.id != userIdInDisplayFrame) {
        el.style.height = "100px";
        el.style.width = "100px";
      }
    });
  } else {
    sharingScreen = false;
    cameraBtn.style.display = "block";
    document.querySelector(`#user-container-${uid}`).remove();
    await client.unpublish([localScreenTracks]);

    switchToCamera();
  }
};
