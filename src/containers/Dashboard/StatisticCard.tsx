import { makeStyles } from "@material-ui/core";
import { CircularProgress, Grid, Stack, Typography } from "@mui/material";
import React, { useMemo } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import RuleFolderIcon from "@mui/icons-material/RuleFolder";
import { useQuery } from "react-query";
import { DashboardDataType } from "lib/types";

export const StatisticCard: React.FC = () => {
  const classes = useStyles();

  const { data: statisticsData, isFetching } = useQuery<DashboardDataType>(
    `statistics`
  );

  const dataShow = useMemo(() => {
    return [
      {
        label: "Sets",
        value: statisticsData?.set_num ?? 0,
        type: "all",
      },
      {
        label: "Ongoing sets",
        value: statisticsData?.ongoing_set_num ?? 0,
        type: "running",
      },
      {
        label: "Unlearned sets",
        value: statisticsData?.unlearned_set_num ?? 0,
        type: "upcoming",
      },
    ];
  }, [statisticsData]);

  const getIcon = (type: string) => {
    switch (type) {
      case "all":
        return <FolderIcon className={classes.fontSizeIcon} />;
      case "running":
        return <LocalLibraryIcon className={classes.fontSizeIcon} />;
      case "upcoming":
        return <RuleFolderIcon className={classes.fontSizeIcon} />;
      default:
        return <FolderIcon className={classes.fontSizeIcon} />;
    }
  };

  return (
    <Grid container spacing={2}>
      {dataShow.map((data, index: number) => {
        return (
          <Grid item xs={12} md={4} key={index}>
            <Stack className={classes.containerCard}>
              <Typography className={classes.label}>{data.label}</Typography>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ marginBottom: "20px" }}
              >
                {getIcon(data.type)}
                {!isFetching ? (
                  <Typography className={classes.value}>
                    {data.value}
                  </Typography>
                ) : (
                  <CircularProgress size={30} />
                )}
              </Stack>
            </Stack>
          </Grid>
        );
      })}
    </Grid>
  );
};

const useStyles = makeStyles({
  containerCard: {
    maxHeight: 200,
    width: "100%",
    borderRadius: "12px",
    border: "1px solid #878787",
    padding: "20px",
    height: "100%",
    position: "relative",
  },
  fontSizeIcon: {
    fontSize: "80px !important",
    color: "#878787",
  },
  label: {
    fontSize: "24px !important",
    fontWeight: 700,
    lineHeight: "30px",
    color: "#000000",
  },
  value: {
    fontSize: "36px !important",
    fontWeight: 800,
    lineHeight: "36px",
    color: "#000000",
  },
  detailButton: {
    position: "absolute",
    left: 0,
    top: 0,
    height: "50px",
    backgroundColor: "cadetblue",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    width: "100%",
  },
});
