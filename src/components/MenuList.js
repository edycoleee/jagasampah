import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import HomeWorkTwoToneIcon from "@material-ui/icons/HomeWorkTwoTone";
import AssessmentTwoToneIcon from "@material-ui/icons/AssessmentTwoTone";
import AssignmentTurnedInTwoToneIcon from "@material-ui/icons/AssignmentTurnedInTwoTone";
import { Link } from "react-router-dom";

export const mainListItems = (
  <div>
    <Link to="/dashboard">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </Link>
    <Link to="/user">
      <ListItem button>
        <ListItemIcon>
          <HomeWorkTwoToneIcon />
        </ListItemIcon>
        <ListItemText primary="Profile Pengguna" />
      </ListItem>
    </Link>
    <Link to="/harian">
      <ListItem button>
        <ListItemIcon>
          <AssessmentTwoToneIcon />
        </ListItemIcon>
        <ListItemText primary="Sampah Harian" />
      </ListItem>
    </Link>
    <Link to="/sampah3r">
      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Sampah 3R" />
      </ListItem>
    </Link>
    <Link to="/bsampah">
      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Data Bank Sampah" />
      </ListItem>
    </Link>
    <Link to="/driver">
      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Data Driver" />
      </ListItem>
    </Link>
      <Link to="/datauser">
        <ListItem button>
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary="Data User" />
        </ListItem>
      </Link>
    <Link to="/lapor">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Lapor Sampah" />
      </ListItem>
    </Link>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Laporan Sampah</ListSubheader>
    <Link to="/tpahari">
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="TPA HARIAN" />
    </ListItem>
    </Link>
    <Link to="/tpabulan">
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="TPA BULANAN" />
    </ListItem>
    </Link>
    <Link to="/tpatahun">
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="TPA TAHUNAN" />
    </ListItem>
    </Link>
    <Link to="/tpahari">
    <ListItem button>
      <ListItemIcon>
        <AssignmentTurnedInTwoToneIcon />
      </ListItemIcon>
      <ListItemText primary="3R HARIAN" />
    </ListItem>
    </Link>
    <Link to="/tpabulan">
    <ListItem button>
      <ListItemIcon>
        <AssignmentTurnedInTwoToneIcon />
      </ListItemIcon>
      <ListItemText primary="3R  BULANAN" />
    </ListItem>
    </Link>
    <Link to="/tpatahun">
    <ListItem button>
      <ListItemIcon>
        <AssignmentTurnedInTwoToneIcon />
      </ListItemIcon>
      <ListItemText primary="3R  TAHUNAN" />
    </ListItem>
    </Link>
  </div>
);
