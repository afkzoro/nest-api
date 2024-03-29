import { Test } from '@nestjs/testing'
import { AppModule } from '../src/app.module'
import * as pactum from 'pactum'
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthDto } from 'src/auth/dto';
import { EditUserDto } from 'src/user/dto';

describe('App e2e', () => {
    let app: INestApplication
    let prisma: PrismaService
    beforeAll( async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleRef.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({
            whitelist: true
          }))

        await app.init()
        await app.listen(3333)

        prisma = app.get(PrismaService)
        await prisma.cleanDb()

        pactum.request.setBaseUrl('http://localhost:3333')
    })
    afterAll( () => {
        app.close()
    })

    describe('Auth', () => {
        const dto: AuthDto = {
                    email: 'testemail1@gmail.com',
                    password: '123'
                }
        describe('Signup', () => {
            it('should signup', () => {
                return pactum
                .spec()
                .post('/auth/signup')
                .withBody(dto)
                .expectStatus(201)
            });

            it('should throw if email empty', () => {
                return pactum
                .spec()
                .post('/auth/signup')
                .withBody({
                    password: dto.password
                })
                .expectStatus(400)
            });

            it('should throw if password is empty', () => {
                return pactum
                .spec()
                .post('/auth/signup')
                .withBody({
                    email: dto.email
                })
                .expectStatus(400)
            });

            it('should throw if body is empty', () => {
                return pactum
                .spec()
                .post('/auth/signup')
                .withBody({})
                .expectStatus(400)
            });
        })

        describe('Signin', () => {
            let accessToken: string
            it('should signin', () => {
                return pactum
                .spec()
                .post('/auth/signin')
                .withBody(dto)
                .expectStatus(200)
                .stores('userAt', 'access_token')
            });

            it('should throw if email empty', () => {
                return pactum
                .spec()
                .post('/auth/signin')
                .withBody({
                    password: dto.password
                })
                .expectStatus(400)
            });

            it('should throw if password is empty', () => {
                return pactum
                .spec()
                .post('/auth/signin')
                .withBody({
                    email: dto.email
                })
                .expectStatus(400)
            });

            it('should throw if body is empty', () => {
                return pactum
                .spec()
                .post('/auth/signin')
                .withBody({})
                .expectStatus(400)
            });
        })
    });

    describe('User', () => {
        describe('Get me', () => {
            it('should get current user', () => {
                return pactum
                .spec()
                .get('/users/me')
                .withBearerToken('$S{userAt}')
                .expectStatus(200)
                .inspect()
            })
        })

        describe('Edit user', () => {
            it('should edit user', () => {
                const dto: EditUserDto = {
                    firstName: "hydra",
                    email: "hydra@gmail.com"
                }
                return pactum
                .spec()
                .patch('/users')
                .withBearerToken('$S{userAt}')
                .expectStatus(200)
                .inspect()
                .withBody(dto)
                .expectBodyContains(dto.firstName)
                .expectBodyContains(dto.email)
            })
        })
    });

    describe('Bookmarks', () => {
        describe('Create bookmark', () => {})

        describe('Get bookmarks', () => {})

        describe('Get bookmark by id', () => {})

        describe('Edit bookmark by id', () => {})

        describe('Delete bookmark by id', () => {})
    });
})