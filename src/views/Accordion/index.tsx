import React from 'react';
import styles from './styles.module.scss';
import cx from 'classnames';
import AccordionView from '@material-ui/core/Accordion';
import { List, ListItem, ListItemText } from '@material-ui/core';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionActions';

function Accordion({ onClick, tasks }: any) {
  return tasks.map((taskType: any) => (
    <AccordionView key={taskType.id} className={styles.expanded}>
      <AccordionSummary className={styles.summary}>
        {taskType.name}
      </AccordionSummary>
      <AccordionDetails className={styles.emptyPadding}>
        <List className={cx(styles.emptyPadding, styles.tasksList)}>
          {
            taskType.tasks.map((t: any, index: number) => (
              <ListItem key={index} button onClick={() => onClick(t)}>
                <ListItemText>{t.name}</ListItemText>
              </ListItem>
            ))
          }
        </List>
      </AccordionDetails>
    </AccordionView>
  ));
}

export default Accordion;
