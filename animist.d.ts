export default class Animist {
    private id;
    private secret;
    private authInfo;
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
    constructor(id: string, secret: string);
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
    get(route: string, urlParams: object): Promise<any>;
    private authenticate();
}
