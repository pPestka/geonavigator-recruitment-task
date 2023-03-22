package pl.geonavigator.backend.domain.service;
import pl.geonavigator.backend.domain.encoder.PasswordEncoder;
import pl.geonavigator.backend.domain.model.User;
import pl.geonavigator.backend.domain.model.dto.AuthDataDto;
import pl.geonavigator.backend.domain.model.dto.CreateUserDto;
import pl.geonavigator.backend.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsersService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public String register(CreateUserDto user) {
        return userRepository
                .save(user
                        .toUser()
                        .withPassword(passwordEncoder.encode(user.password())));
    }

    public AuthDataDto login(String username, String password) {
        return userRepository
                .findByUsername(username)
                .filter(user -> passwordEncoder.check(password, user.getPassword()))
                .map(User::toAuthDataDto)
                .orElseThrow(() -> new IllegalStateException("Authentication failed for username: %s!".formatted(username)));
    }

    public List<User> getAll(){
        return userRepository.getAll();
    }

    public void createNewUser(User user) {
        this.userRepository.create(user);
    }

    public User getUserById(Long id) {
        return this.userRepository.findById(id);
    }

    public void remove(Long id) {
        User user=this.userRepository.findById(id);
        this.userRepository.delete(user);
    }

    public void updateUser(Long id, User user) {
        User existing =this.userRepository.findById(id);
        if (existing==null){
            this.userRepository.create(user);
        }else {
            user.setId(existing.getId());
            this.userRepository.update(user);
        }
    }
}

