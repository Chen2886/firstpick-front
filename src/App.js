import "./styles/App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  ThemeProvider,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import Order from "./components/Order";
import Customer from "./components/Customer";
import Feedback from "./components/Feedback";
import Inventory from "./components/Inventory";
import Recipe from "./components/Recipe";
import { buttonTheme } from "./styles/Theme";

function App() {
  const links = [
    { Name: "Order", Link: "/", Component: Order },
    { Name: "Customer", Link: "/customer", Component: Customer },
    { Name: "Feedback", Link: "/feedback", Component: Feedback },
    {
      Name: "Inventory",
      Link: "/inventory",
      Component: Inventory,
    }, { Name: "Recipe",
    Link: "/recipe",
    Component: Recipe,
  },
  ];

  return (
    <Router>
      <div id='nav-bar'>
        <AppBar position='sticky'>
          <Toolbar>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' component='div'>
              First Pick
            </Typography>
            <ThemeProvider theme={buttonTheme}>
              <div className='nav-bar-buttons'>
                {links.map((item, i) => (
                  <Button
                    component={Link}
                    to={item.Link}
                    key={i}
                    variant='text'
                    color='primary'>
                    {item.Name}
                  </Button>
                ))}
              </div>
            </ThemeProvider>
          </Toolbar>
        </AppBar>
        <Switch>
          {links.map((item, key) => (
            <Route
              exact
              path={item.Link}
              component={item.Component}
              key={key}
            />
          ))}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
