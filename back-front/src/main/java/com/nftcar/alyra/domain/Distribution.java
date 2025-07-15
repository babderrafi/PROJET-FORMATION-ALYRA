package com.nftcar.alyra.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.math.BigDecimal;
import javax.persistence.*;
import javax.validation.constraints.*;

/**
 * A Distribution.
 */
@Entity
@Table(name = "distribution")
public class Distribution implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "amount_usdc", precision = 21, scale = 2, nullable = false)
    private BigDecimal amountUsdc;

    @NotNull
    @Column(name = "status", nullable = false)
    private String status;

    @ManyToOne
    @JsonIgnoreProperties(value = { "car" }, allowSetters = true)
    private Revenue revenue;

    @ManyToOne
    @JsonIgnoreProperties(value = { "car" }, allowSetters = true)
    private Part part;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Distribution id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getAmountUsdc() {
        return this.amountUsdc;
    }

    public Distribution amountUsdc(BigDecimal amountUsdc) {
        this.setAmountUsdc(amountUsdc);
        return this;
    }

    public void setAmountUsdc(BigDecimal amountUsdc) {
        this.amountUsdc = amountUsdc;
    }

    public String getStatus() {
        return this.status;
    }

    public Distribution status(String status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Revenue getRevenue() {
        return this.revenue;
    }

    public void setRevenue(Revenue revenue) {
        this.revenue = revenue;
    }

    public Distribution revenue(Revenue revenue) {
        this.setRevenue(revenue);
        return this;
    }

    public Part getPart() {
        return this.part;
    }

    public void setPart(Part part) {
        this.part = part;
    }

    public Distribution part(Part part) {
        this.setPart(part);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Distribution)) {
            return false;
        }
        return id != null && id.equals(((Distribution) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Distribution{" +
            "id=" + getId() +
            ", amountUsdc=" + getAmountUsdc() +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
