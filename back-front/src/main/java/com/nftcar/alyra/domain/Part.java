package com.nftcar.alyra.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Part.
 */
@Entity
@Table(name = "part")
public class Part implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "owner_wallet", nullable = false)
    private String ownerWallet;

    @NotNull
    @Column(name = "percentage", precision = 21, scale = 2, nullable = false)
    private BigDecimal percentage;

    @ManyToOne
    private Car car;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Part id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOwnerWallet() {
        return this.ownerWallet;
    }

    public Part ownerWallet(String ownerWallet) {
        this.setOwnerWallet(ownerWallet);
        return this;
    }

    public void setOwnerWallet(String ownerWallet) {
        this.ownerWallet = ownerWallet;
    }

    public BigDecimal getPercentage() {
        return this.percentage;
    }

    public Part percentage(BigDecimal percentage) {
        this.setPercentage(percentage);
        return this;
    }

    public void setPercentage(BigDecimal percentage) {
        this.percentage = percentage;
    }

    public Car getCar() {
        return this.car;
    }

    public void setCar(Car car) {
        this.car = car;
    }

    public Part car(Car car) {
        this.setCar(car);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Part)) {
            return false;
        }
        return id != null && id.equals(((Part) o).id);
    }

    @Override
    public int hashCode() {

        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Part{" +
            "id=" + getId() +
            ", ownerWallet='" + getOwnerWallet() + "'" +
            ", percentage=" + getPercentage() +
            "}";
    }
}
