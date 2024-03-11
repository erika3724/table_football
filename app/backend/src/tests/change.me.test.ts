import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Model } from 'sequelize';

import { App } from '../app';
import Matches from '../database/models/matches.model';
import Users from '../database/models/user.model';
import { Response } from 'superagent';


const { app } = new App();

chai.use(chaiHttp);

const { expect } = chai;


interface resMatch {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamHome: {
    teamName: string;
  };
  teamAway: {
    teamName: string;
  };
}

describe('Seu teste login', () => {

  let mockLogin: Model<any, any>;

  let chaiHttp: Response;

  const user = {
    id: 99,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
  }

  beforeEach(() => {
    mockLogin = Users.build(user);

    sinon.stub(Users, "findOne").resolves(mockLogin);
  });

  afterEach(() => {
    sinon.restore();
  });
  
  it('retornar um status 401', async () => {
    chaiHttp = await chai.request(app).post('/login').send({ email: 'Admin' , password: 'secret_admin'})
    expect(chaiHttp).to.have.status(401);
  });

  it('retornar um status 401', async () => {
    chaiHttp = await chai.request(app).post('/login').send({ email: 'admin@admin.com' , password: 'secret_admin_incorrect'})
    expect(chaiHttp).to.have.status(401);
  });

   
  it('retornar um status 400', async () => {
    chaiHttp = await chai.request(app).post('/login').send({ email: 'admin@admin.com'})
    expect(chaiHttp).to.have.status(400);    
  });

  it('retorna 400',async () => {
    chaiHttp = await chai.request(app).post('/login').send({password: 'secret_admin'})
    expect(chaiHttp).to.have.status(400);
  });


  it('retorna 400',async () => {
    chaiHttp = await chai.request(app).post('/login').send({ email: 'adminmm@.com' , password: 'secret_admin'})
    expect(chaiHttp).to.have.status(401);
  });
});

describe('Seu teste  leaderboard', () => {

  let mockMatches: Model<any, any>[];

  let chaiHttp: Response;

  beforeEach(() => {
    const resMatches: resMatch[] =  [
      {
        "id": 13,
        "homeTeamId": 10,
        "homeTeamGoals": 0,
        "awayTeamId": 6,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
          "teamName": "Flamengo"
        },
        "teamAway": {
          "teamName": "Grêmio"
        }
      },
      {
        "id": 1,
        "homeTeamId": 10,
        "homeTeamGoals": 0,
        "awayTeamId": 6,
        "awayTeamGoals": 1,
        "inProgress": true,
        "teamHome": {
          "teamName": "flamengo"
        },
        "teamAway": {
          "teamName": "Internacional"
        }
      }
    ];

    mockMatches = resMatches.map(match => {
      const modelInstance = Matches.build();

      Object.entries(match).forEach(([key, value]) => {
        modelInstance.setDataValue(key, value);
      });

      return modelInstance;
    });

    sinon.stub(Matches, 'findAll').resolves(mockMatches);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('retornar um status 200', async () => {
    chaiHttp = await chai.request(app).get('/leaderboard/away');
    expect(chaiHttp).to.have.status(200);
    
  });
  it('retornar um status 200', async () => {
    chaiHttp = await chai.request(app).get('/leaderboard/home');
    expect(chaiHttp).to.have.status(200);
  });
  
  it('retorna 200',async () => {
    chaiHttp = await chai.request(app).get('/leaderboard');
    expect(chaiHttp).to.have.status(200);
  });

});

