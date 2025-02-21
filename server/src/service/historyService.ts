// TODO: Define a City class with name and id properties
class City {
  name: string;
  id: string;

  constructor(name: string, id: string) 
  {
    this.name = name;
    this.id = id;
  }
}

// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  readonly cities: City[] = [];
  private async read() {
    const fs = require('fs');
    const data = fs.readFileSync('searchHistory.json', 'utf8');
    console.log(data);
    return data;
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
   private async write(cities: City[]) {
    const fs = require('fs');
    fs.writeFileSync('searchHistory.json', JSON.stringify(cities));
   }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    const data = await this.read();
    const cities = JSON.parse(data);
    return cities;
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    const data = await this.read();
    const cities = JSON.parse(data);
    cities.push(city);
    await this.write(cities);
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    const data = await this.read();
    const cities = JSON.parse(data);
    const newCities = cities.filter((city: {id: string}) => city.id !== id);
    await this.write(newCities);
  }
}

export default new HistoryService();
