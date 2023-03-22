package pl.geonavigator.backend.domain.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.geonavigator.backend.domain.model.Location;
import pl.geonavigator.backend.domain.repository.LocationRepository;

import java.util.List;

@Service
public class LocationService {
    @Autowired
    LocationRepository locationRepository;
    public void createNewLocation(boolean visiblState,double imputValueGeodesicY, double imputValueGeodesicX, double geodesicY, double geodesicX, String latitudeBDecimal,String longitudeLDecimal, String latitudeBDegreeMinutesSeconds,String longitudeLDegreeMinutesSeconds,String linkToGoogleMaps ){
        Location newLocation=new Location(visiblState,imputValueGeodesicY,imputValueGeodesicX,geodesicY, geodesicX, latitudeBDecimal, longitudeLDecimal,  latitudeBDegreeMinutesSeconds, longitudeLDegreeMinutesSeconds, linkToGoogleMaps );
        locationRepository.create(newLocation);
    }

    public List<Location> getAll(){
        return locationRepository.getAll();
    }

    public Location getLocationById(Long id) {
        return this.locationRepository.findById(id);
    }

    public void createNewLocation(Location location) {
        this.locationRepository.create(location);
    }

    public void remove(Long id) {
        Location location=this.locationRepository.findById(id);
        this.locationRepository.delete(location);
    }

    public void updateLocation(Long id, Location location) {
        Location existing =this.locationRepository.findById(id);
        if (existing==null){
            this.locationRepository.create(location);
        }else {
            location.setId(existing.getId());
            this.locationRepository.update(location);
        }
    }
}
