import { Container, InputFilter, TD, SummaryContainer } from "./styles";
import { AsteroidContext } from "../../AsteroidContext";
import type { NearEarthObjects } from "../../AsteroidContext";
import { useContext, useEffect, useState } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

export function AsteroidsTable() {
  const asteroidSearched = useContext(AsteroidContext);
  const [nearEarthObjects, setNearEarthObjects] = useState<NearEarthObjects[]>(
    []
  );
  const [resultFilterList, setResultFilterList] = useState<NearEarthObjects[]>(
    []
  );
  const [filterList, setFilterList] = useState("");
  const [filterByDate, setFilterByDate] = useState("");

  /* setNEO */
  useEffect(() => {
    const newObject: NearEarthObjects[] = [];
    if (asteroidSearched) {
      Object.values(asteroidSearched.near_earth_objects).forEach(
        (neo: NearEarthObjects[]) => {
          newObject.push(...neo);
        }
      );
      setNearEarthObjects(newObject);
    }
  }, [asteroidSearched]);

  /* Filters */
  useEffect(() => {
    const inputedDate = searchData(filterByDate, filterList);

    function searchData(dateValue: string, nameValue: string) {
      const filteredData: NearEarthObjects[] = [];

      if (!dateValue.length && !nameValue.length) {
        return nearEarthObjects;
      }

      for (let i = 0; i < nearEarthObjects.length; i++) {
        const objectDated =
          nearEarthObjects[i].close_approach_data[0].close_approach_date;
        const newTextValue = nameValue.toLowerCase();
        const objectName = nearEarthObjects[i].name.toLowerCase();

        if (
          objectDated.includes(dateValue) &&
          objectName.includes(newTextValue)
        ) {
          filteredData.push(nearEarthObjects[i]);
        }
      }
      return filteredData;
    }
    setResultFilterList(inputedDate);
  }, [filterByDate, filterList, nearEarthObjects]);

  return (
    <Container>
      <SummaryContainer>
        <div>
          <header>
            <p>Busque por Nome:</p>

            <InputFilter
              className="form-input"
              type="text"
              placeholder="Nome Asteroide"
              value={filterList}
              onChange={(ev) => setFilterList(ev.target.value)}
            />
          </header>
        </div>
        <div>
          <header>
            <p>Busque por Data:</p>
            <InputFilter
              className="form-input"
              type="date"
              placeholder="Data"
              value={filterByDate}
              onChange={(ev) => setFilterByDate(ev.target.value)}
            />
          </header>
        </div>
      </SummaryContainer>

      <table>
        <thead>
          <tr>
            <th>Nome Asteroide</th>
            <th>Data</th>
            <th>Estimativa Diametro min. (km)</th>
            <th>Estimativa Diametro max. (km)</th>
            <th>Distancia da Terra (km)</th>
            <th>Periculosidade</th>
          </tr>
        </thead>

        <tbody>
          {!asteroidSearched && (
            <tr>
              <strong>Carregando</strong>
              <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
            </tr>
          )}

          {asteroidSearched &&
            resultFilterList.map((neo) => (
              <tr key={neo.id}>
                <td>{neo.name}</td>
                <td>{neo.close_approach_data[0].close_approach_date} </td>
                <td>
                  {neo.estimated_diameter.kilometers.estimated_diameter_min}
                </td>
                <td>
                  {neo.estimated_diameter.kilometers.estimated_diameter_max}
                </td>
                <td>
                  {neo.close_approach_data.length &&
                    neo.close_approach_data[0].miss_distance.kilometers}
                </td>
                <TD danger={neo.is_potentially_hazardous_asteroid}>
                  {neo.is_potentially_hazardous_asteroid
                    ? "DANGER"
                    : "NOT DANGER"}
                </TD>
              </tr>
            ))}
        </tbody>
      </table>
    </Container>
  );
}
