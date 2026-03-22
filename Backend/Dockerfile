FROM eclipse-temurin:25-jdk-alpine
WORKDIR /app
COPY . .
RUN ./mvnw clean install -DskipTests
EXPOSE 8080
CMD ["java", "-jar", "target/javawebapp-0.0.1-SNAPSHOT.jar"]