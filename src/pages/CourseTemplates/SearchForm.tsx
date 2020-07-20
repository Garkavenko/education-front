import React, { useEffect, useState } from 'react';
import { Autocomplete } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import { years } from '../../utils';
import makeStyles from '@material-ui/core/styles/makeStyles';

interface SearchFormProps {
  disciplines: any[];
  seasons: any[];
  direction?: 'row' | 'column';
  onSearch: (disciplineId: number | null, profileId: number | null, year: number | null, seasonId: number | null) => void;
}

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    margin: -10,
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    margin: 10,
  },
}));

function SearchForm({ disciplines, seasons, direction = 'row', onSearch }: SearchFormProps) {
  const styles = useStyles();
  const [discipline, setDiscipline] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [year, setYear] = useState(null);
  const [season, setSeason] = useState<any>(null);

  useEffect(() => {
    onSearch(discipline?.id, profile?.id, year, season?.id);
  }, [discipline?.id, onSearch, profile?.id, season?.id, year]);

  return (
    <div className={styles.container} style={{ flexDirection: direction }}>
      <Autocomplete
        options={disciplines}
        value={discipline}
        noOptionsText="Нет данных"
        className={styles.input}
        onChange={(e, value) => {
          setDiscipline(value);
          if (!value) setProfile(null);
        }}
        getOptionLabel={(discipline) => discipline.name}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Дисциплина" variant="outlined" />}
      />
      <Autocomplete<any>
        options={discipline?.disciplineProfiles || []}
        value={profile}
        className={styles.input}
        noOptionsText="Нет данных"
        onChange={(e, value) => setProfile(value)}
        getOptionLabel={(profile) => profile.name}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Профиль" variant="outlined" />}
      />
      <Autocomplete<any>
        options={years}
        value={year}
        className={styles.input}
        noOptionsText="Выберите дисциплину"
        onChange={(e, value) => setYear(value)}
        getOptionLabel={(year) => `${year}`}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Год" variant="outlined" />}
      />
      <Autocomplete<any>
        options={seasons}
        value={season}
        className={styles.input}
        noOptionsText="Нет данных"
        onChange={(e, value) => setSeason(value)}
        getOptionLabel={(season) => season.name}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Сезон года" variant="outlined" />}
      />
    </div>
  );
}

export default SearchForm;
