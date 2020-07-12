import React from 'react';
import styles from './styles.module.scss';
import cx from 'classnames';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { ExpansionPanelDetails, List, ListItem, ListItemText } from '@material-ui/core';

function Accordion({ onClick, tasks }: any) {
  return tasks.map((taskType: any) => (
    <ExpansionPanel key={taskType.id} className={styles.expanded}>
      <ExpansionPanelSummary className={styles.summary}>
        {taskType.name}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={styles.emptyPadding}>
        <List className={cx(styles.emptyPadding, styles.tasksList)}>
          {
            taskType.tasks.map((t: any, index: number) => (
              <ListItem key={index} button onClick={() => onClick(t)}>
                <ListItemText>{t.name}</ListItemText>
              </ListItem>
            ))
          }
        </List>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  ));
}

export default Accordion;
