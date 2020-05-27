import React, { useMemo, useEffect } from 'react';
import styles from './styles.module.scss';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import {ExpansionPanelDetails, List, ListItem, ListItemText} from "@material-ui/core";
import useQuery from "../../hooks/useQuery";
import { API_URL } from "../../constants";

function Accordion({ onClick }) {
    const [state, fetch] = useQuery(`${API_URL}/task-types`);
    useEffect(() => {
        fetch();
    }, [fetch]);

    if (state.loading || !state.data) {
        return (
            <div style={{
                display: "flex",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}>
                Загрузка...
            </div>
        )
    }
  return state.data.map((taskType) => {
    return (
      <ExpansionPanel key={taskType.id} className={styles.expanded}>
        <ExpansionPanelSummary className={styles.summary}>
          {taskType.name}
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <List>
            {
            taskType.tasks.map(t => (
                <ListItem button onClick={() => onClick(t)}>
                  <ListItemText>{t.name}</ListItemText>
                </ListItem>
              ))
            }
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  })
}

export default Accordion;
