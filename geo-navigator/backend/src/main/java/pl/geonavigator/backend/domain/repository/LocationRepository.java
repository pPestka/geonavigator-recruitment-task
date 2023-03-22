package pl.geonavigator.backend.domain.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import pl.geonavigator.backend.domain.model.Location;

import java.util.List;

@Repository
public class LocationRepository {

    @PersistenceContext
    private EntityManager emLocatiom;

    @Transactional
    public void create(Location location){
        emLocatiom.persist(location);
    }
    @Transactional
    public void update(Location location){
        emLocatiom.merge(location);
    }

    public Location findById(Long locationId){
        return emLocatiom.find(Location.class, locationId);
    }

    public List<Location> getAll(){
        return emLocatiom.createQuery("Select location from Location location", Location.class).getResultList();
    }

    @Transactional
    public void delete(Location location){
        emLocatiom.remove(location);
    }
}
