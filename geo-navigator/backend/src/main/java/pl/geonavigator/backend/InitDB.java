package pl.geonavigator.backend;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import pl.geonavigator.backend.domain.service.LocationService;
import pl.geonavigator.backend.domain.service.UsersService;

@Component
public class InitDB implements CommandLineRunner {
    @Autowired
    LocationService locationService;
    @Autowired
    UsersService usersService;

    @Override
    public void run(String... args) throws Exception {
    }
}
