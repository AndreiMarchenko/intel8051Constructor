import './top-panel.css';
import BlocksList from "./blocks-list/BlocksList";
import ToolsList from "./tools-list/ToolsList";

export default function TopPanel({ topPanelDimensions }) {
    return (
        <div className='top-panel' style={{ width: topPanelDimensions.width, height: topPanelDimensions.height }}>
            <BlocksList />
            <ToolsList />
        </div>
    );
}