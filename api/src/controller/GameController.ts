import { GameService } from '../service/GameService';
import { UserService } from '../service/UserService';
import { JsonController, Param, Get, Post } from 'routing-controllers';
import "reflect-metadata";

@JsonController()
class GameController {

  constructor(
    private gameService: GameService,
    private userService: UserService,
  ) {
  }

  @Get("/game/:username/:id")
  get(@Param('username') username: string, @Param('id') id: number) {
    let user = this.userService.getUser(username);
    let game = this.gameService.getGame(id, user);
    return game;
  }

  @Post("/game/:username")
  create(@Param('username') username: string) {
    console.log('here');
    let user = this.userService.getUser(username);
    let game = this.gameService.createGame(user);
    return game;
  }

  @Get("/game/:username/:id/start")
  start(@Param('username') username: string, @Param('id') id: number) {
    let user = this.userService.getUser(username);
    let game = this.gameService.getGame(id, user);
    this.gameService.start(user, game);
    return game;
  }
}

export { GameController }
