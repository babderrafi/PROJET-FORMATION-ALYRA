FROM maven:3.9.6-eclipse-temurin-17

# Dossier de travail dans l'image Docker
WORKDIR /app

# Copie uniquement le dossier back-front dans l'image
COPY back-front/ .

# Compilation du projet Java
RUN mvn clean install -DskipTests

# Port exposé (à adapter selon ton app Spring Boot)
EXPOSE 8080

# Lancement de l'application
CMD ["java", "-jar", "target/*.jar"]
