package pl.geonavigator.backend.domain.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.geonavigator.backend.domain.model.Location;
import pl.geonavigator.backend.domain.service.LocationService;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="http://localhost:3000")

public class LocationController {
    @Autowired
    LocationService locationService;

    @GetMapping("locations")
    public List<Location> getAllLocations(){
        return locationService.getAll();
    };

    @GetMapping("/locations/{id}")
    public Location getLocation(@PathVariable Long id){
        return locationService.getLocationById(id);
    };

    @PostMapping("/locations")
    public void createLocation(@RequestBody Location location){
        locationService.createNewLocation(location);
    }

    @DeleteMapping("/locations/{id}")
    public void deleteLocation(@PathVariable Long id){
        locationService.remove(id);
    }

    @PutMapping("/locations/{id}")
    public void updateLocation(@PathVariable Long id, @RequestBody Location location){
        this.locationService.updateLocation(id, location);
    }
}


