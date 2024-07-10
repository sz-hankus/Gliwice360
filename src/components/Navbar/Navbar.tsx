import { GithubCircle } from "iconoir-react";
import gliwiceCoatOfArmsUrl from "../../assets/gliwice_coat_of_arms.png";
import "./Navbar.css";
import { SearchBar } from "./SearchBar/SearchBar";
import { useEffect, useState } from "react";

import _points from "../../data/points.json";
const pointsData: Point[] = _points;

interface NavbarProps {
  onResultPinClick: (point: Point) => void;
  onResultPanoClick: (point: Point) => void;
}

export const Navbar = ({
  onResultPinClick,
  onResultPanoClick,
}: NavbarProps) => {
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState<Point[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setResults(
      pointsData.filter(
        (point) =>
          point.name.toLowerCase().includes(search) ||
          point.description.toLowerCase().includes(search)
      )
    );

  }, [search])

  return (
    <div id="navbar">
      <div id="logo">
        <img src={gliwiceCoatOfArmsUrl} />
        <h1>Gliwice360</h1>
      </div>
      <SearchBar
        value={search}
        onChange={handleSearchChange}
        onResultPinClick={onResultPinClick}
        onResultPanoClick={onResultPanoClick}
        results={results}
      />
      <div id="etc">
        <a href="somelink">
          <GithubCircle fontSize={20} />
        </a>
      </div>
    </div>
  );
};
