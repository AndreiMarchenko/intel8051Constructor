import Field from "./field/Field";
import TopPanel from "./top-panel/TopPanel";
import ControlUnit from "./ControlUnit";
import { TOP_PANEL_HEIGHT } from '../globals/globals';
import Sidebar from "./sidebar/Sidebar";


export default function WorkBench() {
    const CLK_PANEL_HEIGHT = 70;

    const topPanelDimensions = {
        width: window.innerWidth,
        height: TOP_PANEL_HEIGHT
    };

    const clkPanelDimensions = {
        width: window.innerWidth,
        height: CLK_PANEL_HEIGHT
    };

    const fieldDimensions = {
        width: window.innerWidth - 170,
        height: window.innerHeight - TOP_PANEL_HEIGHT - CLK_PANEL_HEIGHT
    };

    return (
        <div>
            <TopPanel
                topPanelDimensions={topPanelDimensions}
            />
            <Sidebar />
            <Field
                fieldDimensions={fieldDimensions}
                clkPanelDimensions={clkPanelDimensions}
            />
            <ControlUnit />
        </div>
    );
}