import React from "react";
import Grid from "@mui/material/Grid";

import { ItemsDefinition } from "types";
import { PlayerItemsList, Rows } from "./PlayerItemsList";
import { PlayerItemsSummary } from "./PlayerItemsSummary";

type PlayerItemsProps = {
  items: ItemsDefinition;
  onNewGame: () => void;
  playerItems: string[];
};

export const PlayerItems: React.FC<PlayerItemsProps> = ({
  items,
  onNewGame,
  playerItems,
}) => {
  const rows: Rows = React.useMemo(
    () => calculateRows(items, playerItems),
    [items, playerItems]
  );
  const [bonuses, total] = React.useMemo(
    () =>
      Object.values(rows).reduce(
        ([bonus, total]: [number, number], current) => [
          bonus + current.bonus,
          total + current.bonus + current.score,
        ],
        [0, 0]
      ),
    [rows]
  );

  return (
    <Grid
      container
      direction="column"
      sx={{
        height: "100%",
        overflow: "hidden",
      }}
      alignItems="stretch"
      spacing={1}
      flexWrap="nowrap"
    >
      <Grid
        item
        flexGrow={1}
        sx={{
          overflow: "auto",
        }}
      >
        <PlayerItemsList rows={rows} />
      </Grid>
      <Grid item>
        <PlayerItemsSummary
          bonuses={bonuses}
          onNewGame={onNewGame}
          total={total}
        />
      </Grid>
    </Grid>
  );
};

function calculateRows(items: ItemsDefinition, playerItems: string[]): Rows {
  const rows: Rows = {};
  
  // Decide what unique and eligble items have been collected and order their keys by time collected
  const uniqueEligblePlayerItems = Array.from(new Set(playerItems)).filter((key) => key in items);

  // Go through every item definition that the player has collected and calculate its score
  for(const key of uniqueEligblePlayerItems) {
      const itemDefinition = items[key];
      const numberOfOccurences = playerItems.filter((playerItem) => playerItem === key).length;
      const qualifiesForBonus = itemDefinition.bonus && numberOfOccurences >= itemDefinition.bonus.count;
  
      rows[key] = {
        item: itemDefinition,
        count: numberOfOccurences,
        score: numberOfOccurences * itemDefinition.value,
        bonus: qualifiesForBonus ? itemDefinition.bonus!.amount : 0
      };
  }

  return rows;
};

// Alternative solution in O(n) time with less readability
function calculateRowsAlternative(items: ItemsDefinition, playerItems: string[]): Rows {
  const rows: Rows = {};
  const eligblePlayerItems = playerItems.filter((key) => key in items);

  // Go through every collected item and update their corresponding score
  for(const key of eligblePlayerItems) {
    const itemDefinition = items[key];

    // Add a new row if the item is the first of its kind
    let row = rows[key] ? rows[key] : {item: itemDefinition, count: 0, score: 0, bonus: 0};
    const count = row.count + 1;
    const bonus = itemDefinition.bonus;

    rows[key] = {
      item: itemDefinition, 
      count: count, 
      score: count * itemDefinition.value, 
      bonus: bonus && count >= bonus.count ? bonus.amount : 0
    };
  }

  return rows;
};