package pl.geonavigator.backend.domain.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import pl.geonavigator.backend.domain.model.dto.AuthDataDto;
import pl.geonavigator.backend.domain.model.role.Role;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;

@EqualsAndHashCode
@Builder
@Getter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private final String username;
    private final String password;
    private final Role role;

    public User(long id, String username, String password, Role role) {
        this.id=id;
        this.username = username;
        this.password = password;
        this.role = role;
    }

    public long getId() {
        return id;
    }

    public User withPassword(String newPassword) {
        return User
                .builder()
                .username(username)
                .password(newPassword)
                .role(role)
                .build();
    }

    public AuthDataDto toAuthDataDto() {
        return new AuthDataDto(username, role);
    }

    @Override
    public String toString() {
        return "User %s [%s]".formatted(username, role.name());
    }

    public void setId(long id) {
        this.id = id;
    }
}
