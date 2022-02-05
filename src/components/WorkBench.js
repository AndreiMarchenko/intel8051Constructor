import Field from "./field/Field";
import TopPanel from "./top-panel/TopPanel";

export default function WorkBench() {
    const TOP_PANEL_HEIGHT = 80;
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
        width: window.innerWidth,
        height: window.innerHeight - TOP_PANEL_HEIGHT - CLK_PANEL_HEIGHT
    };

    return (
        <div>
            <TopPanel
                topPanelDimensions={topPanelDimensions}
            />
            <Field
                fieldDimensions={fieldDimensions}
                clkPanelDimensions={clkPanelDimensions}
            />
        </div>
    );
}