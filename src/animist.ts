import axios from 'axios';

/*
 * Interface used to wrap the response of an authentication request to the
 * AniList Api
 */
interface AuthenticationInfo {
  /*
   * The obtained access token
   */
  access_token: string;
  /*
   * The timestamp in which the access token expires
   */
  expires: number,
  /*
   * The number of seconds until the access token expires
   */
  expires_in: number,
  /*
   * The refresh token used to refresh the access token
   */
  refreshToken: string;
}

// noinspection JSUnusedGlobalSymbols
export default class Animist {
  private authInfo: AuthenticationInfo;

  // noinspection JSUnusedGlobalSymbols
  /**
   * Create a new Animist instance with the passed id and secret.
   *
   * ### Examples
   *
   * Create a new Animist instance using the obtained id and secret:
   *
   * ~~~
   * import Animist from "animist";
   *
   * const animist = new Animist(id, secret);
   * ~~~
   *
   * @param {string} id The client id gotten from AniList developer settings
   * @param {string} secret The client secret gotten from AniList developer
   * settings
   * @public
   */
  public constructor(private id: string, private secret: string) { }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Perform a get request to the AniList Api using the given route and passed
   * parameters
   *
   * ### Examples
   *
   * Get an array of anime using the browse anime endpoint:
   *
   * ~~~
   * import Animist from "animist";
   *
   * const animist = new Animist(process.env.ID, process.env.SECRET);
   *
   * let response;
   *
   * try {
   *   response = await animist.get("browse/anime", {
   *     airing_data: true,
   *     full_page: true,
   *     season: "winter",
   *     sort: "popularity-desc",
   *     status: "finished airing",
   *     type: 'TV',
   *   });
   * } catch (e) {
   *   // Handle error
   * }
   *
   * // Do something with the response
   * ~~~
   *
   * Search for a character by a name:
   *
   * ~~~
   * import Animist from "animist";
   *
   * const animist = new Animist(process.env.ID, process.enc.SECRET);
   *
   * let response;
   *
   * try {
   *   response = await animist.get(`character/search/${query}`;
   * } catch(e) {
   *   // Handle error
   * }
   *
   * // Do something with the response
   * ~~~
   *
   * @param {string} route The route for the request
   * @param {Object} urlParams The desired url parameters for the request
   * @returns {Promise<any>}
   * @public
   */
  public async get(route: string, urlParams: object): Promise<any> {
    if (!this.authInfo) {
      await this.authenticate();
    } else if (Date.now() > this.authInfo.expires) {
      await this.refreshToken();
    }

    const response = await axios({
        baseURL: 'https://animist.co/api/',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'get',
        params: Object.assign({
          access_token: this.authInfo.access_token
        }, urlParams),
        url: route,
      });

    return response.data;
  }

  /*
   * Authenticate with the AniList Api, setting the value of `this.authInfo` to
   * the obtained data.
   */
  private async authenticate() {
    const response = await axios({
      baseURL: 'https://animist.co/api/',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'post',
      params: {
        grant_type: 'client_credentials',
        client_id: this.id,
        client_secret: this.secret,
      },
      url: 'auth/access_token',
    });

    this.authInfo = response.data;
  }

  /*
   * Refresh the access token, if the request fails re-authenticate
   */
  private async refreshToken() {
    let response;

    try {
      response = await axios({
        baseURL: 'https://animist.co/api/',
        method: 'post',
        params: {
          grant_type: 'refresh_token',
          client_id: this.id,
          client_secret: this.secret,
        },
        url: 'auth/access_token',
      });
    } catch (e) {
      return this.authenticate();
    }

    this.authInfo = response.data;
  }
}
