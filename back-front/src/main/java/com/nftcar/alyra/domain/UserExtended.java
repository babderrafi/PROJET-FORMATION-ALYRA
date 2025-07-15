package com.nftcar.alyra.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.nftcar.alyra.domain.enumeration.UserRole;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A UserExtended.
 */
@Entity
@Table(name = "user_extended")
public class UserExtended implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private UserRole role;

    @NotNull
    @Column(name = "ethereum_address", nullable = false)
    private String ethereumAddress;

    @OneToMany(mappedBy = "loueur")
    @JsonIgnoreProperties(value = { "loueur" }, allowSetters = true)
    private Set<Vehicle> vehicles = new HashSet<>();

    @OneToMany(mappedBy = "locataire")
    @JsonIgnoreProperties(value = { "vehicle", "locataire", "loueur" }, allowSetters = true)
    private Set<RentalContract> rentalContractsAsLocataires = new HashSet<>();

    @OneToMany(mappedBy = "loueur")
    @JsonIgnoreProperties(value = { "vehicle", "locataire", "loueur" }, allowSetters = true)
    private Set<RentalContract> rentalContractsAsLoueurs = new HashSet<>();


    @ManyToOne
    @JoinColumn(name = "nft_level_id")
    private NFTLevel nftLevel;

    public void setNftLevel(NFTLevel nftLevel) {
        this.nftLevel = nftLevel;
    }

    public NFTLevel getNftLevel() {
        return nftLevel;
    }


    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public UserExtended id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserRole getRole() {
        return this.role;
    }

    public UserExtended role(UserRole role) {
        this.setRole(role);
        return this;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public String getEthereumAddress() {
        return this.ethereumAddress;
    }

    public UserExtended ethereumAddress(String ethereumAddress) {
        this.setEthereumAddress(ethereumAddress);
        return this;
    }

    public void setEthereumAddress(String ethereumAddress) {
        this.ethereumAddress = ethereumAddress;
    }

    public Set<Vehicle> getVehicles() {
        return this.vehicles;
    }

    public void setVehicles(Set<Vehicle> vehicles) {
        if (this.vehicles != null) {
            this.vehicles.forEach(i -> i.setLoueur(null));
        }
        if (vehicles != null) {
            vehicles.forEach(i -> i.setLoueur(this));
        }
        this.vehicles = vehicles;
    }

    public UserExtended vehicles(Set<Vehicle> vehicles) {
        this.setVehicles(vehicles);
        return this;
    }

    public UserExtended addVehicles(Vehicle vehicle) {
        this.vehicles.add(vehicle);
        vehicle.setLoueur(this);
        return this;
    }

    public UserExtended removeVehicles(Vehicle vehicle) {
        this.vehicles.remove(vehicle);
        vehicle.setLoueur(null);
        return this;
    }

    public Set<RentalContract> getRentalContractsAsLocataires() {
        return this.rentalContractsAsLocataires;
    }

    public void setRentalContractsAsLocataires(Set<RentalContract> rentalContracts) {
        if (this.rentalContractsAsLocataires != null) {
            this.rentalContractsAsLocataires.forEach(i -> i.setLocataire(null));
        }
        if (rentalContracts != null) {
            rentalContracts.forEach(i -> i.setLocataire(this));
        }
        this.rentalContractsAsLocataires = rentalContracts;
    }

    public UserExtended rentalContractsAsLocataires(Set<RentalContract> rentalContracts) {
        this.setRentalContractsAsLocataires(rentalContracts);
        return this;
    }

    public UserExtended addRentalContractsAsLocataire(RentalContract rentalContract) {
        this.rentalContractsAsLocataires.add(rentalContract);
        rentalContract.setLocataire(this);
        return this;
    }

    public UserExtended removeRentalContractsAsLocataire(RentalContract rentalContract) {
        this.rentalContractsAsLocataires.remove(rentalContract);
        rentalContract.setLocataire(null);
        return this;
    }

    public Set<RentalContract> getRentalContractsAsLoueurs() {
        return this.rentalContractsAsLoueurs;
    }

    public void setRentalContractsAsLoueurs(Set<RentalContract> rentalContracts) {
        if (this.rentalContractsAsLoueurs != null) {
            this.rentalContractsAsLoueurs.forEach(i -> i.setLoueur(null));
        }
        if (rentalContracts != null) {
            rentalContracts.forEach(i -> i.setLoueur(this));
        }
        this.rentalContractsAsLoueurs = rentalContracts;
    }

    public UserExtended rentalContractsAsLoueurs(Set<RentalContract> rentalContracts) {
        this.setRentalContractsAsLoueurs(rentalContracts);
        return this;
    }

    public UserExtended addRentalContractsAsLoueur(RentalContract rentalContract) {
        this.rentalContractsAsLoueurs.add(rentalContract);
        rentalContract.setLoueur(this);
        return this;
    }

    public UserExtended removeRentalContractsAsLoueur(RentalContract rentalContract) {
        this.rentalContractsAsLoueurs.remove(rentalContract);
        rentalContract.setLoueur(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserExtended)) {
            return false;
        }
        return id != null && id.equals(((UserExtended) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UserExtended{" +
            "id=" + getId() +
            ", role='" + getRole() + "'" +
            ", ethereumAddress='" + getEthereumAddress() + "'" +
            "}";
    }
}
