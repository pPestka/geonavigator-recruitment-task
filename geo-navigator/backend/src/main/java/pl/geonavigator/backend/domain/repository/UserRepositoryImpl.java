package pl.geonavigator.backend.domain.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.transaction.annotation.Transactional;
import pl.geonavigator.backend.domain.model.User;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public class UserRepositoryImpl implements UserRepository {

    private final Map<String, User> users = new HashMap<>();

    @Override
    public String save(User user) {
        var username = user.getUsername();
        if (users.containsKey(username)) {
            throw new IllegalStateException("Username already exists");
        }
        users.put(username, user);
        return username;
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return Optional.ofNullable(users.getOrDefault(username, null));
    }

    @PersistenceContext
    private EntityManager emUser;
    @Transactional
    public void create(User user){
        emUser.persist(user);
    }
    @Transactional
    public void update(User user){
        emUser.merge(user);
    }

    public User findById(Long userId){
        return emUser.find(User.class, userId);
    }

    public List<User> getAll(){
        return emUser.createQuery("Select user from User user", User.class).getResultList();
    }

    @Transactional
    public void delete(User user){
        emUser.remove(user);
    }
}
