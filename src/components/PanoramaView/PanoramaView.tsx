import { useRef } from "react";
import { ReactPhotoSphereViewer, ViewerAPI } from "react-photo-sphere-viewer";
import { useParams } from "react-router-dom";

import _points from "../../data/points.json";
import { TitleBar } from "./TitleBar/TitleBar";
const pointsData: Point[] = _points;

export const PanoramaView = () => {
  const { id } = useParams();
  const point = pointsData.filter(point => point.id === Number.parseInt(id || "0"))[0]; // TODO: what to do when id is undefined?
  const ref = useRef<ViewerAPI>(null);

  // const zoomIn = () => {
  //   const current = ref.current?.getZoomLevel();
  //   if (current !== undefined)
  //     ref.current?.animate({ zoom: current + 20, speed: 100 });

  //   console.log("current: ", current);
  //   console.log("after zoom:", ref.current?.getZoomLevel());
  // };

  // const zoomOut = () => {
  //   const current = ref.current?.getZoomLevel();
  //   if (current) ref.current?.animate({ zoom: current - 20, speed: 100 });

  //   console.log("current: ", current);
  //   console.log("after zoom:", ref.current?.getZoomLevel());
  // };

  return (
    <>
      <TitleBar point={point} />
      <ReactPhotoSphereViewer
        ref={ref}
        src={`${window.location.origin}/panoramas/${point.panoramaId}.jpg`}
        height={"100vh"}
        width={"100%"}
        onZoomChange={(newZoom) => console.log("zoom", newZoom)}
      />
      {/* <button
        style={{ position: "absolute", top: 50, right: 50 }}
        onClick={zoomIn}
      >
        zoom in
      </button>
      <button
        style={{ position: "absolute", top: 70, right: 50 }}
        onClick={zoomOut}
      >
        zoom out
      </button>
      <button style={{ position: "absolute", top: 90, right: 50 }}>
        {" "}
        {`${ref.current?.getZoomLevel()}`}{" "}
      </button> */}
    </>
  );
};
