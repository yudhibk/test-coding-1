import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as pactum from "pactum";
import { AuthDtoLogin, AuthDtoRegister } from "../src/auth/dto";

describe('App e2e', () => {
  let app: INestApplication;
  beforeAll(
    async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();
      app = moduleRef.createNestApplication();
      app.useGlobalPipes(
        new ValidationPipe({
          whitelist: true,
        }
      ));
      await app.init();
      await app.listen(3333);
      pactum.request.setBaseUrl('http://localhost:3333')
    }
  );
  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    describe('Signup', () => {
      const dto: AuthDtoRegister = {
        email: 'test-api@gmail.com',
        password: '123',
        fullname: 'Nanih Koreh',
        username: 'nanih'
      }
      it('testo signup', () => {
        return pactum
        .spec()
        .post('/auth/signup')
        .withBody(dto)
        .expectStatus(201);
      });
    })

    describe('Signin', () => {
      it('testo signin', () => {
        const dto: AuthDtoLogin = {
          email: 'test-api@gmail.com',
          password: '123'
        }
        return pactum
        .spec()
        .post('/auth/signin')
        .withBody(dto)
        .expectStatus(201)
        .stores('userAt', 'access_token');
      });
    });

    describe('Profile', () => {
      it('testo signin', () => {
        const dto: AuthDtoLogin = {
          email: 'test-api@gmail.com',
          password: '123'
        }
        return pactum
        .spec()
        .get('/auth/profile')
        .withHeaders({
          Authorization: 'Bearer $S{userAt}'
        })
        .expectStatus(200);
      });
    });
  })
});
