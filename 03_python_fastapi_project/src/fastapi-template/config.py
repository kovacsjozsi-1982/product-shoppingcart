from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "Kovacs Jozsef's default api"
    database_url: str = "sqlite+aiosqlite:///./app.db"
    debug: bool = True

    class Config:
        env_file = ".env"


settings = Settings()
print("Loaded settings:", settings.dict())
