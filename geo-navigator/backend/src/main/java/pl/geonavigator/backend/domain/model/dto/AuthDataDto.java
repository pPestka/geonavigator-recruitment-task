package pl.geonavigator.backend.domain.model.dto;

import pl.geonavigator.backend.domain.model.role.Role;

public record AuthDataDto(String username, Role role) {
}
