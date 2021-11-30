import "./App.css";
import "react-tabs/style/react-tabs.css";

import {
  Chessboard,
  ChessmanMenu,
  DataTypes,
  MenuItem,
  VariableList,
  VariableMenu,
} from "@idealjs/blueprint-react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

function App() {
  return (
    <div className="App">
      <div style={{ width: "100vw", height: "100vh", display: "flex" }}>
        <div style={{ width: "200px", backgroundColor: "#5e5ebb" }}>
          <Tabs>
            <TabList>
              <Tab>Item</Tab>
              <Tab>Types</Tab>
              <Tab>Variable</Tab>
            </TabList>
            <TabPanel>
              <MenuItem />
            </TabPanel>
            <TabPanel>
              <DataTypes />
            </TabPanel>
            <TabPanel>
              <VariableList />
              <VariableMenu />
            </TabPanel>
          </Tabs>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1 }}>
            <Chessboard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
