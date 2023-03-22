package pl.geonavigator.backend.domain.model.dto;

import pl.geonavigator.backend.domain.model.User;
import pl.geonavigator.backend.domain.model.role.Role;

public record CreateUserDto(String username, String password, Role role) {
    public User toUser() {
        return User
                .builder()
                .username(username)
                .password(password)
                .role(role)
                .build();
    }
}
