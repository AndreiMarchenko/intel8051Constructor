import './top-panel.css';
import BlocksList from "./blocks-list/BlocksList";

export default function TopPanel({ topPanelDimensions }) {
    return (
        <div className='top-panel' style={{ width: topPanelDimensions.width, height: topPanelDimensions.height }}>
            <BlocksList />
        </div>
    );
}