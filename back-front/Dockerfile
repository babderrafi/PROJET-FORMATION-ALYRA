# Utilise une image Java avec Maven
FROM maven:3.9.6-eclipse-temurin-17

# Crée un dossier de travail
WORKDIR /app

# Copie le projet dans l'image
COPY . .

# Compile sans les tests
RUN ./mvnw clean install -DskipTests

# Expose le port (ajuste si nécessaire)
EXPOSE 8080

# Démarre l’application
CMD ["java", "-jar", "target/*.jar"]
