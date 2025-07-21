FROM maven:3.9.6-eclipse-temurin-17

# Va dans le bon dossier
WORKDIR /app

# Copie uniquement le contenu du dossier back-front
COPY . .

# Compile avec Maven
RUN mvn clean install -DskipTests

# Expose le port de ton app (à adapter si ce n’est pas 8080)
EXPOSE 8080

# Lancer l'app Spring Boot
CMD ["java", "-jar", "target/*.jar"]
