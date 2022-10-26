import React from "react";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles((theme) => ({
  pathname: {
    fontSize: "1.142rem",
    color: "#115293",
  },
}));
const Breadcrumb = React.memo((props: any) => {
  const { crumbs, prefix } = props;
  const classes = useStyle();
  const history = useHistory();
  const location = useLocation();
  const handleClick = (path: string) => {
    const paths = location.pathname.split("/");
    if (paths.length === 5) {
      const path_name = "/" + paths[1] + "/" + paths[2] + "/" + paths[3];
      history.push(prefix + path_name);
    } else {
      history.push(prefix + path);
    }
  };

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      style={{
        color: "#115293",
        marginBottom: 20,
      }}
    >
      {crumbs.map((e: any, i: number) =>
        i + 1 !== crumbs.length ? (
          <Link
            key={e.name}
            className={classes.pathname}
            style={{
              cursor: "pointer",
            }}
            color="inherit"
            onClick={() => handleClick(e.path)}
          >
            {e.name}
          </Link>
        ) : (
          <Typography
            key={e.name}
            className={classes.pathname}
            color="textPrimary"
          >
            {e.name}
          </Typography>
        )
      )}
    </Breadcrumbs>
  );
});

export default Breadcrumb;
