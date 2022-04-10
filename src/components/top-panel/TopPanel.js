import './top-panel.css';
import BlocksList from "./blocks-list/BlocksList";
import ToolsList from "./tools-list/ToolsList";
import { TOP_PANEL_WIDTH, TOP_PANEL_HEIGHT } from "../../globals/globals";

export default function TopPanel() {
    return (
        <div className='top-panel' style={{ width: TOP_PANEL_WIDTH, height: TOP_PANEL_HEIGHT }}>
            <BlocksList />
            <ToolsList />
        </div>
    );
}