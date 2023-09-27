import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class MovieApiService {
  private readonly axios: AxiosInstance = axios;

  async movieSearch(term: string) {
    
    const response = await this.axios.get(`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${term}`);
    return response.data;
  }
  
  async movieByTitle(title: string) {
    
    const response = await this.axios.get(`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&t=${title}`);
    return response.data;
  }

}
