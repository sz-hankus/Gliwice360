import { ArrowLeft } from "iconoir-react";
import "./TitleBar.css"
import { useNavigate } from "react-router-dom";

export interface TitleBarProps {
    point: Point;
};

export const TitleBar = ({ point }: TitleBarProps) => {
    const navigate = useNavigate();
    return (
        <div id="container">
            <div id="icon" onClick={() => navigate(-1)}> {/* TODO: navigate to the map with the point in the center? */}
                <ArrowLeft />
            </div>
            <div id="text">
                <div id="name">{point.name}</div>
            </div>
        </div>
    )
}