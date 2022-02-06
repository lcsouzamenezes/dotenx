package config

import "github.com/kelseyhightower/envconfig"

type (
	Config struct {
		App       App
		Database  Database
		Redis     Redis
		Secrets   Secrets
		Endpoints Endpoints
		Queue     Queue
	}

	App struct {
		Port           string `envconfig:"AOA_APP_PORT" default:"3004"`
		Environment    string `envconfig:"AOA_APP_ENV"`
		AllowedOrigins string `envconfig:"AOA_APP_ALLOWED_ORIGINS" default:"*"`
		GrpcPort       string `envconfig:"AOA_APP_GRPC_PORT" default:3005"`
	}

	Queue struct {
		URL      string `envconfig:"AOA_AMQP_URL"`
		Exchange string `envconfig:"AOA_QUEUE_EXCHANGE"`
		Key      string `envconfig:"AOA_QUEUE_KEY"`
		BULL     string `envconfig:"AOA_BULL_URL"`
	}
	Endpoints struct {
		Core string `envconfig:"AOA_CORE_API_URL"`
	}

	Database struct {
		Host     string `envconfig:"AOA_DATABASE_HOST"`
		Port     int    `envconfig:"AOA_DATABASE_PORT"`
		User     string `envconfig:"AOA_DATABASE_USER"`
		Password string `envconfig:"AOA_DATABASE_PASSWORD"`
		DbName   string `envconfig:"AOA_DATABASE_DBNAME"`
		Extras   string `envconfig:"AOA_DATABASE_EXTRAS"`
		Driver   string `envconfig:"AOA_DATABASE_DRIVER" default:"postgres"`
	}

	Redis struct {
		Host     string `envconfig:"AOA_REDIS_HOST"`
		Port     string `envconfig:"AOA_REDIS_PORT"`
		User     string `envconfig:"AOA_REDIS_USER"`
		Password string `envconfig:"AOA_REDIS_PASSWORD"`
		DB       int    `envconfig:"AOA_REDIS_DBNAME"`
	}

	Secrets struct {
		AuthServerJwtSecret string `envconfig:"AOA_AUTH_SERVER_JWT_SECRET"`
		AppName             string `envconfig:"AOA_APP_NAME"`
		AppSecret           string `envconfig:"AOA_APP_SECRET"`
	}
)

var Configs Config

func Load() error {
	err := envconfig.Process("", &Configs)
	return err
}
