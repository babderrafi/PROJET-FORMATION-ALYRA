package com.nftcar.alyra.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.nftcar.alyra.domain.enumeration.StatutContrat;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A RentalContract.
 */
@Entity
@Table(name = "rental_contract")
public class RentalContract implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "date_debut", nullable = false)
    private Instant dateDebut;

    @NotNull
    @Column(name = "date_fin", nullable = false)
    private Instant dateFin;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "statut", nullable = false)
    private StatutContrat statut;

    @NotNull
    @Column(name = "frais_appliques", precision = 21, scale = 2, nullable = false)
    private BigDecimal fraisAppliques;

    @NotNull
    @Column(name = "id_bc", precision = 21, scale = 2, nullable = false)
    private BigDecimal idBc;


    @ManyToOne
    @JsonIgnoreProperties(value = { "loueur" }, allowSetters = true)
    private Vehicle vehicle;

    @ManyToOne
    @JsonIgnoreProperties(value = { "vehicles", "rentalContractsAsLocataires", "rentalContractsAsLoueurs" }, allowSetters = true)
    private UserExtended locataire;

    @ManyToOne
    @JsonIgnoreProperties(value = { "vehicles", "rentalContractsAsLocataires", "rentalContractsAsLoueurs" }, allowSetters = true)
    private UserExtended loueur;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public RentalContract id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDateDebut() {
        return this.dateDebut;
    }

    public RentalContract dateDebut(Instant dateDebut) {
        this.setDateDebut(dateDebut);
        return this;
    }

    public void setDateDebut(Instant dateDebut) {
        this.dateDebut = dateDebut;
    }

    public Instant getDateFin() {
        return this.dateFin;
    }

    public RentalContract dateFin(Instant dateFin) {
        this.setDateFin(dateFin);
        return this;
    }

    public void setDateFin(Instant dateFin) {
        this.dateFin = dateFin;
    }

    public StatutContrat getStatut() {
        return this.statut;
    }

    public RentalContract statut(StatutContrat statut) {
        this.setStatut(statut);
        return this;
    }

    public void setStatut(StatutContrat statut) {
        this.statut = statut;
    }

    public BigDecimal getFraisAppliques() {
        return this.fraisAppliques;
    }

    public RentalContract fraisAppliques(BigDecimal fraisAppliques) {
        this.setFraisAppliques(fraisAppliques);
        return this;
    }

    public void setFraisAppliques(BigDecimal fraisAppliques) {
        this.fraisAppliques = fraisAppliques;
    }

    public Vehicle getVehicle() {
        return this.vehicle;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }

    public RentalContract vehicle(Vehicle vehicle) {
        this.setVehicle(vehicle);
        return this;
    }

    public UserExtended getLocataire() {
        return this.locataire;
    }

    public void setLocataire(UserExtended userExtended) {
        this.locataire = userExtended;
    }

    public RentalContract locataire(UserExtended userExtended) {
        this.setLocataire(userExtended);
        return this;
    }

    public UserExtended getLoueur() {
        return this.loueur;
    }

    public void setLoueur(UserExtended userExtended) {
        this.loueur = userExtended;
    }

    public RentalContract loueur(UserExtended userExtended) {
        this.setLoueur(userExtended);
        return this;
    }

    public BigDecimal getIdBc() {
        return idBc;
    }

    public void setIdBc(BigDecimal idBc) {
        this.idBc = idBc;
    }
// jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RentalContract)) {
            return false;
        }
        return id != null && id.equals(((RentalContract) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "RentalContract{" +
            "id=" + getId() +
            ", dateDebut='" + getDateDebut() + "'" +
            ", dateFin='" + getDateFin() + "'" +
            ", statut='" + getStatut() + "'" +
            ", fraisAppliques=" + getFraisAppliques() +
            "}";
    }
}
