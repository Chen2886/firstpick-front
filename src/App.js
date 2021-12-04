import { Switch, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

import Order from "./components/Order";
import Customer from "./components/Customer";
import Feedback from "./components/Feedback";
import Inventory from "./components/Inventory";
import Recipe from "./components/Recipe";

const links = [
  { Name: "Order", Link: "/", Component: Order },
  { Name: "Customer", Link: "/customer", Component: Customer },
  { Name: "Feedback", Link: "/feedback", Component: Feedback },
  {
    Name: "Inventory",
    Link: "/inventory",
    Component: Inventory,
  },
  { Name: "Recipe", Link: "/recipe", Component: Recipe },
];

function App() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='sticky' color='default'>
          <Toolbar>
            <Typography variant='h6' component='div'>
              First Pick
            </Typography>
            {links.map((item, i) => (
              <Button
                component={Link}
                to={item.Link}
                key={i}
                style={{ marginLeft: "1rem" }}
                variant='text'
                color='secondary'>
                {item.Name}
              </Button>
            ))}
          </Toolbar>
        </AppBar>
      </Box>
      <Switch>
        {links.map((item, key) => (
          <Route exact path={item.Link} component={item.Component} key={key} />
        ))}
      </Switch>
    </>
  );
}

export default App;
