import { AppBar, Toolbar, Typography } from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";

const Topbar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${sizeConfigs.sidebar.width})`,
        height: 100,
        ml: sizeConfigs.sidebar.width,
        boxShadow: "1px 3px 4px gray",
        backgroundColor: colorConfigs.topbar.bg,
        color: colorConfigs.topbar.color,
        padding: 2,
        paddingLeft: 5
      }}
    >
      <Toolbar>
        <Typography variant="h5" >
          <b>Online Banking System</b>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;