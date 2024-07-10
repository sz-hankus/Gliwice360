import { MapPin, Search, View360 } from "iconoir-react";
import "./SearchBar.css";
import { Fragment, useEffect, useRef, useState } from "react";

export interface SearchProps {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  results?: Point[];
  onResultPinClick: (point: Point) => void;
  onResultPanoClick: (point: Point) => void;
  placeholder?: string;
}

export const SearchBar = ({
  value,
  onChange,
  results,
  onResultPinClick,
  onResultPanoClick,
  placeholder = "Szukaj",
}: SearchProps) => {
  const mainContainer = useRef<HTMLDivElement>(null);
  const resultsPanel = useRef<HTMLDivElement>(null);
  const [resultsPanelVisible, setResultsPanelVisible] =
    useState<boolean>(false);
  const [resultsPanelStyles, setResultPanelStyles] =
    useState<React.CSSProperties>({});

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    if (resultsPanel.current?.contains(e.relatedTarget)) {
      return;
    }
    setResultsPanelVisible(false);
  };

  const updateResultPanelPosition = () => {
    if (!mainContainer.current) return;
    const { top, height, left, width } =
      mainContainer.current.getBoundingClientRect();
    setResultPanelStyles({
      top: top + height + 6,
      left: left,
      width: width,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", updateResultPanelPosition);
    updateResultPanelPosition();
    setResultsPanelVisible(false);
    return () =>
      window.removeEventListener("resize", updateResultPanelPosition);
  }, []);

  return (
    <>
      <div id="searchbar-container" ref={mainContainer}>
        <Search />
        <div id="separator" />
        <input
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setResultsPanelVisible(true)}
          onBlur={handleBlur}
        />
      </div>
      <div
        id="result-panel"
        style={{
          ...resultsPanelStyles,
          display: resultsPanelVisible ? "flex" : "none",
        }}
        ref={resultsPanel}
      >
        <div id="overlay"></div>
        {results?.map((point) => (
          <Fragment key={point.id}>
            <div className="result">
              <div id="text" tabIndex={1} onBlur={handleBlur}>
                <div id="name">{point.name}</div>
                <div id="description">{point.description}</div>
              </div>
              <div
                id="pin-icon"
                onClick={() => {
                  onResultPinClick(point);
                  setResultsPanelVisible(false);
                }}
                tabIndex={1}
              >
                <MapPin />
              </div>
              <div id="image-container" tabIndex={1}>
                <img alt="image" src={`/thumbnails/${point.thumbnailId}.jpg`} />
                <div id="overlay" onClick={() => onResultPanoClick(point)}>
                  <View360 />
                </div>
              </div>
            </div>
            <div className="separator" />
          </Fragment>
        ))}
      </div>
    </>
  );
};
