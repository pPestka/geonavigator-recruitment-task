package pl.geonavigator.backend.domain.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.geonavigator.backend.domain.model.User;
import pl.geonavigator.backend.domain.service.UsersService;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="http://localhost:3000")

public class UserController {
    @Autowired
    UsersService usersService;

    @GetMapping("users")
    public List<User> getAllUsers(){
        return usersService.getAll();
    };

    @GetMapping("/users/{id}")
    public User getUser(@PathVariable Long id){
        return usersService.getUserById(id);
    };

    @PostMapping("/users")
    public void createUser(@RequestBody User user){
        usersService.createNewUser(user);
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id){
        usersService.remove(id);
    }

    @PutMapping("/users/{id}")
    public void updateUser(@PathVariable Long id, @RequestBody User user){
        this.usersService.updateUser(id, user);
    }
}
