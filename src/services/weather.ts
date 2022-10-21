import request from './config/axios.config';

export default class Weather {
  static getForecast8Days(queryString:string) {
    return request({
      url: `/onecall?${queryString}`,
      method: 'GET'
    });
  }
}
